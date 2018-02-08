import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import React from 'react';
import { compose } from 'recompose';

//import { Downloads } from '/imports/api/downloads/download_collection.js';

import jobQueue from '/imports/api/jobqueue/jobqueue.js';

/**
 * https://www.robinwieruch.de/gentle-introduction-higher-order-components/
 * @param  {[type]}   conditionalRenderingFn [description]
 * @param  {Function} EitherComponent)       [description]
 * @return {[type]}                          [description]
 */
const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) =>
  conditionalRenderingFn(props)
    ? <EitherComponent />
    : <Component { ...props } />

const Loading = () => {
  return (
    <div> 
      <p> Loading...</p>
    </div>
  )
}

const Waiting = () => {
  return (
    <div>
      <p> Waiting...</p>
    </div>
  )
}

const Running = () => {
  return (
    <div>
      <p> Running... </p>
    </div>
  )
}

const isLoading = (props) => {
  console.log(`check isLoading: ${props.loading}`)
  return props.loading;
}

const isWaiting = (props) => {
  const waitingStates = ['waiting','ready']
  const isWaiting = waitingStates.indexOf(props.job.status) > 0;//props.job.status === 'waiting';
  console.log(`check isWaiting ${isWaiting}`);
  return isWaiting;
}

const isRunning = (props) => {
  const isRunning = props.job.status === 'running';
  console.log(`check isRunning: ${isRunning}`);
  return isRunning;
}

const isFinished = (props) => {
  const isFinished = props.job.status === 'completed';
  console.log(`check isFinished: ${isFinished}`);
  return isFinished;
}

const withConditionalRendering = compose(
  withEither(isLoading, Loading),
  withEither(isWaiting, Waiting),
  withEither(isRunning, Running)
)

class Download extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
  }

  render(){
    const downloadUrl = Meteor.absoluteUrl(this.props.job.result.value)
    console.log(downloadUrl)
    window.open(downloadUrl, '', '', true)
    return (
      <div>Job is ready, should begin download</div>
    )
  }
}

export default withTracker(props => {
  const queryHash = FlowRouter.getParam('_id');
  //const downloadSub = Meteor.subscribe('downloads', downloadId)
  console.log(jobQueue.findOne({ 'data.queryHash': queryHash }))
  const jobSub = Meteor.subscribe('jobQueue');
  return {
    loading: !jobSub.ready(),
    job: jobQueue.findOne({ 'data.queryHash': queryHash })
  }
})(withConditionalRendering(Download));