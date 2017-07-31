import uniq from 'lodash/uniq';

Tracker.autorun( () => {
  Meteor.subscribe('userList');
  Session.setDefault('viewing',[]);
})

Template.feature.helpers({
  singleGene(){
    const geneId = FlowRouter.getParam('_id');
    const gene = Genes.findOne({ ID: geneId });
    return gene
  },
  tab:function(){
    return Template.instance().currentTab.get();
  },
  tabData:function(){
    const tab = Template.instance().currentTab.get();
    const data = {
      'info': this,
      'seq': this,//this.subfeatures.filter(function(x){return x.type === 'mRNA'}),
      'interproscan': this,//this.subfeatures.filter(function(x){return x.type === 'mRNA'}),
      'genemodel': this
    };
    return data[tab];
  },
  transcripts: function(){
    const transcripts = this.subfeatures.filter( (sub) => {return sub.type === 'mRNA'});
    return transcripts
  },
  isOwner: function () {
    return this.owner === Meteor.userId();
  },
  featuretype: function(){
    return this.source;
  },
  orthologs: function(){
    return this.attributes['putative orthologs'];
  },
  subfeatureNumber: function(){
    return this.children.length;
  },
  domainCount: function(){
    //const transcripts = this.subfeatures.filter( (sub) => {return sub.type === 'mRNA'});
    //const domains = transcripts.map( (transcript) => { return Object.keys(transcript.interproscan) })
    const domains = this.domains ? this.domains : []
    if (domains.length){
      return uniq(domains[0]).length
    } else {
      return 0
    }
    
  },
  orthogroupSize: function(){
    const orthogroup = Orthogroups.findOne({ID:this.orthogroup})
    let orthogroupSize = 0
    if (orthogroup !== undefined){
      orthogroupSize = orthogroup.alignment.length
    }
    return orthogroupSize
  },
  user: function(userId){
    const user = Meteor.users.findOne({ _id: userId });
    return user.username
  },
  hasExpression: function(){
    const gene = this;
    //const roles = Roles.getRolesForUser(.userId);
    const expression = Expression.find({geneId: gene.ID}).fetch()
    
    return expression.length > 0
  }
});

Template.feature.events({
  'click .nav-tabs li': function(event){
    const currentTab = $( event.target ).closest('li');
    currentTab.addClass('active');
    $('.nav-tabs li').not(currentTab).removeClass('active');

    const target = currentTab.context.hash
    targetOffset = $(target).offset().top
    $('html','body').animate({scrollTop:targetOffset},200);
    //template.currentTab.set( currentTab.data( "template" ) );
  },
  'click #interproscan': function(event,template){
    console.log(this.ID)
    const userId = Meteor.userId()
    if (!userId) {
      throw new Meteor.Error('not-authorized');
    }
    if (! Roles.userIsInRole(userId,'admin')){
      throw new Meteor.Error('not-authorized');
    }

    const job = new Job(template.jobQueue, 'interproscan',
      {
        geneId: this.ID
      })

    job.priority('normal').save()
  
  }
});

Template.feature.onCreated( function () {
  let template = this;
  let geneId = FlowRouter.getParam('_id');

  console.log(template.jobQueue)

  template.jobQueue = JobCollection('jobQueue', { noCollectionSuffix: true });

  template.autorun( function () {
    template.subscribe('editHistory');
    template.subscribe('singleGene',geneId)
    
    template.subscribe('jobQueue',()=>{
      console.log('subscribed to jobQueue')
    })
  })
})

Template.feature.onDestroyed(function(){
  console.log('destroyed feature template')
})



 