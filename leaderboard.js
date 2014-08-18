// 1. create new collection and make accesible on both server and client
PlayersList = new Meteor.Collection('players')

if(Meteor.isClient){

  // 2. write template helper to return collection
  Template.leaderboard.player = function(){
    return PlayersList.find({}, {sort: {score : -1, name: 1}});  
  }

  Template.leaderboard.events({

    // 3. create interface to show collection,
    // receive user input through action event,
    // initialize session variable to store user's input on a specific element of collection
    // this refers to the element in the collection that is currently being iterated through
    // i.e. record what part of the interface the user has acted on and store in session variable
    'click li.player': function(){
      var playerID = this._id;
      Session.set('selected player', playerID);
      var selectedPlayer = Session.get('selected player');
      console.log(selectedPlayer);
    },

    // 5. use session variable to focus on specific element
    // write template helper to update data in that element
    'click #increment': function(){
      var selectedPlayer = Session.get('selected player')
      PlayersList.update(
        { _id: selectedPlayer},
        {$inc: {score: 5}}
      )
    }

  });

  // 4. use session variable to focus on specific element,
  // write template helper to update interface that shows which element the user acted on
  // i.e. highlight a section when a user clicks on it
  Template.leaderboard.selectedClass = function(){
    var selectedPlayer = Session.get('selected player');
    var playerID = this._id;
    if  (selectedPlayer === playerID){
      return 'selected';
    }
  }

  // 6. use session variable to focus on specific element and return that element from collection 
  Template.leaderboard.showSelectedPlayer = function(){
    var selectedPlayer = Session.get('selected player');
    return Playerslist.findOne(selectedPlayer);
  }
  
}

if(Meteor.isServer){
  
}
