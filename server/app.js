/**
 * Created by web-01 on 2018/1/12.
 */
const express=require('express');
const mysql=require('mysql');
const http=require("http");
const bodyParser=require("body-parser");
const session=require("express-session");
const cookieParser=require("cookie-parser");

let pool=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"meixin",
    port:"3306",
    connectionLimit:25
});

let app=new express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:"07john"
}));
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header('Access-Control-Allow-Credentials','true');
  next();
});


var server=http.createServer(app);
app.listen(3000);

app.get('/',(req,res)=>{
    res.end("server on")
});
//首页产品
app.get('/indexproduct',(req,res)=>{
    var sql="SELECT mx_index_cake.pid,mx_product.subtitle,mx_product_pic.limg,mx_product.title,mx_product.mprice,mx_product.nprice FROM (mx_index_cake,mx_product) JOIN mx_product_pic ON (mx_index_cake.pid=mx_product_pic.pid) WHERE mx_index_cake.pid=mx_product.pid AND mx_index_cake.display=1";
    pool.getConnection((err,conn)=> {
        conn.query(sql,(err, result)=> {
            if (err)throw err;
            res.json(result);
            conn.release();
        })
    })
});
//轮播产品
app.get('/lunbo',(req,res)=>{
  var sql="select pid,superimg from mx_index_lunbo where display=1";
  pool.getConnection((err,conn)=> {
    conn.query(sql,(err, result)=> {
      if (err)throw err;
      res.json(result);
      conn.release();
    })
  })
});
//获得产品详情
app.get('/getproduct',(req,res)=> {
  let pid = parseInt(req.query.pid);
  var sql = "SELECT mx_product.pid,mx_product.title,mx_product.is_cake," +
    "mx_product.subtitle,mx_product.mprice,mx_product.nprice,mx_product.pound,mx_product.taste,mx_product.details," +
    "mx_product_pic.sbimg,mx_product_pic.simg FROM mx_product,mx_product_pic WHERE mx_product.pid='?' AND mx_product.pid=mx_product_pic.pid AND mx_product.is_shop=1 ";
  pool.getConnection((err, conn)=> {
    conn.query(sql, [pid], (err, result)=> {
      if (err)throw err;
      res.json(result);
      conn.release();
    })
  })
});
//注册功能
  app.get('/register', (req, res)=> {
    let uphone = req.query.uphone;
    let upwd = req.query.upwd;
    var sql = "INSERT INTO mx_user (uphone,upwd) VALUES (?,?)";
    pool.getConnection((err, conn)=> {
      conn.query(sql, [uphone, upwd], (err, result)=> {
        if (err){
          res.send({"status": "bad"});
        }else{
          res.send({"status": "ok"});
        }
        conn.release();
      })
    })
  });
  //登录功能
app.get("/login",(req,res)=>{
  var uphone=req.query.uphone;
  var upwd=req.query.upwd;
  pool.getConnection((err,conn)=>{
    if(err)throw err;
    var sql="SELECT uid,uphone FROM mx_user WHERE uphone=? AND BINARY upwd=?";
    conn.query(sql,[uphone,upwd],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
        var uid=result[0].uid;
        var uid=result[0].uphone;
        req.session.uid=uid;
        req.session.uphone=uphone;
        res.json({code:1,msg:"登录成功",uid:result[0].uid});
      }else{
        res.json({code:-1,msg:"登录失败"})
      }
      conn.release();
    })
  })
});
//检测是否登录，但没有用
app.get("/islogin",(req,res)=>{
  if (req.session.uid) {//检查用户是否已经登录
    res.json({code:1,msg:req.session.uphone});
} else {
  res.json({code:0});
}
//服务器端使用node能正确记住session状态，但用ionic记不住
});
//蛋糕页面产品
app.get("/cakelist",(req,res)=>{
  let pnum = parseInt(req.query.pnum);
  let pagesize=12;
  let page=(pnum-1)*pagesize;
  var sql = "SELECT mx_product.pid,mx_product.title,mx_product.mprice,mx_product.nprice,mx_product_pic.sbimg FROM mx_product,mx_product_pic WHERE mx_product.pid=mx_product_pic.pid AND mx_product.is_cake=1 AND mx_product.is_shop=1 LIMIT ?,?";
  pool.getConnection((err, conn)=> {
    conn.query(sql, [page,pagesize], (err, result)=> {
      if (err)throw err;
      res.json({pnum:pnum,page:page,data:result});
      conn.release();
    })
  })
});
//蛋糕页面总数
app.get("/cakelist_count",(req,res)=>{
  sql="SELECT COUNT(pid) FROM mx_product WHERE mx_product.is_cake=1 AND mx_product.is_shop=1";
  pool.getConnection((err, conn)=> {
    conn.query(sql, (err, result)=> {
      if (err)throw err;
      res.json(result[0]);
      conn.release();
    })
  })
});
//加入购物车
app.get("/addcart",(req,res)=>{
  let uid = parseInt(req.query.uid);
  let pid = parseInt(req.query.pid);
  let count = parseInt(req.query.count);
  sql="INSERT INTO mx_cart(uid,pid,count) VALUES(?,?,?)";
  pool.getConnection((err, conn)=> {
    conn.query(sql,[uid,pid,count],(err, result)=> {
      if (err){
        throw err;
        res.send({"status": "bad"});
      }else{
        res.send({"status": "ok"});
      }
      conn.release();
    })
  })

});




