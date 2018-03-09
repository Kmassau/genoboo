import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Job } from 'meteor/vsivsi:job-collection';

import React from 'react';

import jobQueue from '/imports/api/jobqueue/jobqueue.js';
import { Genes } from '/imports/api/genes/gene_collection.js'; 

import Info from './Info.jsx';
import GenemodelContainer from './Genemodel.jsx';
import SeqContainer from './Seq.jsx';
import ProteinDomains from './ProteinDomains.jsx'; 
import Orthogroup from './Orthogroup.jsx';

import SampleSelection from './SampleSelection.jsx'; 
import ExpressionPlot from './ExpressionPlot.jsx';

class Feature extends React.Component {
  constructor(props){
    super(props)
  }

  runInterproscan = event => {
    console.log(`submitting ${this.props.gene.ID} to interpro`)
    const jobOptions = { geneId: this.props.gene.ID }

    const job = new Job(jobQueue, 'interproscan', jobOptions)

    job.priority('normal').save()
  }

  render(){
    return (
      this.props.loading ?
      "LOADING" :
      <div className="container">
      <div className="card genebook-feature">
        <div className="card-header">
          <a className="navbar-brand" href="#">{this.props.gene.ID}</a>
          <button 
            type="button" 
            className="btn btn-sm btn-danger pull-right" 
            onClick={this.runInterproscan}
            >Interproscan</button>
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="#info">Info</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#gene-model">Gene model</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#sequence">Sequence</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#protein-domains">Protein domains</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#expression">Expression</a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <Info gene={this.props.gene} />
          <section id='genemodel'>
            <hr/>
            <h3>Genemodel</h3>
            <GenemodelContainer gene={this.props.gene} />
          </section>
          <SeqContainer gene={this.props.gene} />
          <ProteinDomains gene={this.props.gene} />
          {
            this.props.gene.orthogroup &&
            <Orthogroup gene={this.props.gene} />
          }
          <section id='expression'>
            <hr />
            <h3>Expression</h3>
            <SampleSelection>
              <ExpressionPlot gene={this.props.gene} />
            </SampleSelection>
          </section>
        </div>
        <div className="card-footer text-muted">
          Gene info
        </div>
      </div>
      </div>
    )
  }
}

export default withTracker(props => {
  const geneId = FlowRouter.getParam('_id');
  const geneSub = Meteor.subscribe('singleGene', geneId);
  return {
    loading: !geneSub.ready(),
    gene: Genes.findOne({ID: geneId})
  }
})(Feature)