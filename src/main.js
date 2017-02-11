/**
 * Created by tudouhu on 2017/1/21.
 */
import React from 'react';
import ReactDom from 'react-dom';
import '../vendors/createjs';
import Other from 'Other';
import Test from 'Test';
import Login from 'components/Login';
import Timer from 'common/Timer';
import Lib from 'res/Lib';
import Woody from 'components/Woody';
import PlaneGame from 'planeDir/PlaneGame';
import SocketClient from 'common/socket/SocketClient';

/**
 * 继承React.Component类 React组件类继承可以写成html写法
 */
class Main extends React.Component{


  /**
   * Main类构造函数
   * @param props
   */
  constructor(props){
    super(props);
  }


  /**
   * 页面卸载移除
   */
  componentWillUnMount(){
    alert("页面卸载移除");
  }


  /**
   * 渲染完成执行
   */
  componentDidMount(){

    //createjs创建矩形
    var testS=new createjs.Shape();
    testS.graphics.beginFill('#00ff00');
    testS.graphics.drawRect(0,0,100,50);
    testS.graphics.endFill();

    //new一个Other类实例对象
    var txt=new Other();
    txt.y = 70;

    //创建Flash打包的元件
    var flash=new Lib.Instance();
    flash.x = 200;
    flash.y = 30;

    //创建人物
    this.woody=new Woody();
    this.woody.x=100;
    this.woody.y=180;

    //添加键盘事件
    // document.addEventListener('keydown',this.onKey);
    // document.addEventListener('keyup',this.onKey);
    //给文档添加鼠标移动事件
    document.addEventListener("mousemove",e=>{flash.txt.text=e.clientX+','+e.clientY});


    // 创建一个舞台，参数为画布
    this.stage=new createjs.Stage(this.refs.myCan);
    //createjs创建的舞台刷新才能显示，下面通过计时器设置为30毫秒刷新一次的帧频
    Timer.add(e=>{this.stage.update();},30,0);
    //添加到舞台显示，可以添加多个
    // stage.addChild(testS,txt,flash,this.woody);

    //显示帧频 默认createjs刷新20
    // createjs.Ticker.framerate = 60;
    // var FPS = {};
    // FPS.time = 0;
    // FPS.FPS = 0;
    // FPS.startFPS = function (stage){
    //   FPS.shape = new createjs.Shape();
    //   FPS.shape.graphics.beginFill("#000000").drawRect(0, 0, 200, 50);
    //   stage.addChild(FPS.shape);
    //   FPS.txt =new createjs.Text("", "40px Arial", "#ffffff");
    //   stage.addChild(FPS.txt);
    //   createjs.Ticker.addEventListener("tick", FPS.TickerFPS);
    // }
    // FPS.TickerFPS = function (event)
    // {
    //   FPS.date = new Date();
    //   FPS.currentTime = FPS.date.getTime();
    //   if(FPS.time!=0)
    //   {
    //     FPS.FPS = Math.ceil(1000/(FPS.currentTime -  FPS.time));
    //   }
    //   FPS.time = FPS.currentTime;
    //   FPS.txt.text = "FPS: "+FPS.FPS;
    // }
    // FPS.startFPS(stage);
  }

  plane=(userName)=>{
    PlaneGame.Name=userName;
    console.log(PlaneGame.Name);
    var planeG=new PlaneGame();
    this.stage.addChild(planeG);
  }


  /**
   * 键盘事件
   * @param e
   */
  onKey=(e)=>{
    let type=e.type=='keydown'?true:e.type=='keyup'?false:'';
    let keyCode=e.keyCode;
    switch(keyCode){
      case 87://W
        type?this.woody.jump():'';
        break;
      case 65://A
        type?this.woody.startWalk(-2,0):type==false?this.woody.stopWalk():'';
        break;
      case 68://D
        type?this.woody.startWalk(2,0):type==false?this.woody.stopWalk():'';
        break;
      case 74://J
        this.woody.startAttack();
        break;
      case 75://K
        this.woody.startguiqizhan();
        break;
      case 32://空格
        this.woody.startDecelerate();
        break;
      default:
        break;


    }


  }


  /**
   * 渲染
   */
  render(){
    return(
      <div>
          {/*//<Test></Test>*/}
          {/*//<h1>A左 D右 W跳 J攻击 K技能</h1>*/}
          <h1>A左 D右 J攻击</h1>
          <p>登陆功能不能用，随便输入一个用户名点击登陆可以玩</p>
          {/*//<div ref='ajaxDiv'>即将获取来自nodejs的数据</div>*/}
        <Login fn={this.plane}></Login>
        <canvas ref='myCan' width='800px' height='300px'></canvas>
      </div>
    );
  }

}
//创建Main标签添加html中id=‘app'Div中
ReactDom.render(<Main></Main>,document.getElementById('app'));












