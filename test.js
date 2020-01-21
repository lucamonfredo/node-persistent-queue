
var Queue = require('./index.js') ;

var q = new Queue('./queue.sqlite') ;

var task1 = {
	data: "Data1"
} ;
var task2 = {
	data: "Data2"
} ;
var task3 = {
	data: "Data3"
} ;
var task4 = {
	data: "Data4"
} ;

q.on('open',function() {
	console.log('Opening SQLite DB') ;
	console.log('Queue contains '+q.getLength()+' job/s') ;
}) ;

q.on('add',function(task) {
	console.log('Adding task: '+JSON.stringify(task)) ;
	console.log('Queue contains '+q.getLength()+' job/s') ;
}) ;

q.on('start',function() {
	console.log('Starting queue') ;
}) ;

q.on('next',function(task) {
	console.log('Queue contains '+q.getLength()+' job/s') ;
	console.log('Process task: ') ;
	console.log(JSON.stringify(task)) ;

    q.hasKey('k3')
      .then( function(result) {
         console.log('Queue has key "k3"? :' + result);
        })
      .catch( err => { console.error(err)});


	// Must tell Queue that we have finished this task
	// This call will schedule the next task (if there is one)
	q.done() ;
}) ;

// Stop the queue when it gets empty
q.on('empty',function() {
	console.log('Queue contains '+q.getLength()+' job/') ;
	q.stop() ;
	q.close()
	.then(function() {
		process.exit(0) ;
	})
}) ;

q.on('stop',function() {
	console.log('Stopping queue') ;
}) ;

q.on('close',function() {
	console.log('Closing SQLite DB') ;
}) ;

q.open()
.then(function() {
   q.add('k1',task1)
	.add('k2',task2)
	.add('k3',task3)
	.add('k4',task4)
	.start() ;
})
.catch(function(err) {
	console.log('Error occurred:') ;
	console.log(err) ;
	process.exit(1) ;
}) ;