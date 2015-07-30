Tasks = new Mongo.Collection("tasks");
CompleteTasks = new Mongo.Collection("completeTasks");
 
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    },
    completeTasks: function () {
      return CompleteTasks.find({});
    }    
  });

   Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
 
      // Insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.text.value = "";
    }
  });

  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      CompleteTasks.insert({
        text: this.text,
        createdAt: this.createdAt // current time
      });  

      //Removing from todo list
      Tasks.remove(this._id);    
      /*Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });*/
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    } 
  });   

  Template.compTask.events({
    "click .delete": function () {
      console.log('sdf');
      CompleteTasks.remove(this._id);
    }    
  });     
}