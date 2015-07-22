var express=require("express");
var flash = require('express-flash');
var session = require('express-session');
var passport=require("passport");
var LocalStrategy = require('passport-local').Strategy;
var app=new express();
app.set("view engine","vash")
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use("local",new LocalStrategy(
  function(username, password, done) {
	var user={id:1,username:"taliu",password:123};
	if(user.username==username&&user.password==password){
console.log(user);
		done(null,user);
	}else{
console.log("password error");
		done(null,false,{message:"username or password error!"});
	}
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	var user={id:1,name:"taliu",password:123};
	done(err, user);
});
app.get("/",function(req,res){
	res.send("it is default page");

});

app.get("/users/:username",function(req,res){
	res.send("welcome "+req.params.username+" login in.");

});
app.get("/login",function(req,res){
	res.render("login");	
});
app.post('/login',
  passport.authenticate('local',
    { successRedirect: '/',
     failureRedirect: '/login',
     failureFlash: true }),
  function(req, res) {
    // 验证成功则调用此回调函数
    res.redirect('/users/' + req.user.username);
  });

app.listen(8899,function(){
   console.log("server listen at 8899");
});
