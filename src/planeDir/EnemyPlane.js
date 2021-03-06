
/**
 * Created by tudouhu on 2017/2/15.
 */

import 'createjs';
import Tools from '../common/Tools';
import BasePlane from '../container/BasePlane';

/**
 * 敌机类
 */
class EnemyPlane extends BasePlane{

  constructor(){
    super();
    /**
     * 帧频被子弹击中
     * @type {boolean}
     */
    this.frameHitB=false;
    /**
     * 攻击次数
     * @type {number}
     */
    this.attackNum=0;
    /**
     * 目标x
     * @type {number}
     */
    this.targetX=0;
    /**
     * 目标y
     * @type {number}
     */
    this.targetY=0;
    /**
     * 当前最大时间
     * @type {number}
     */
    this.currentTime=0;
    this.init();
  }

  /**
   * 数据处理
   * @param data
   */
  dataDispose=(obj)=> {
    if (obj.attack == 1) this.attackNum++;

    if (obj.time < this.currentTime) return;

    this.targetX = obj.x;
    this.targetY = obj.y;

    //let dx = obj.x - this.x;
    //let dy = obj.y - this.y;
    //let dis = Math.sqrt(dx * dx + dy * dy);
    //if (dis > 3 && dis <= 30) {
    //  let angle = Math.atan2(dy, dx);
    //  this.moveNum = Math.floor(dis / this.speed);
    //  this.mx = Math.cos(angle) * this.speed;
    //  this.my = Math.sin(angle) * this.speed;
    //}
    //else{
    //  this.x = obj.x;
    //  this.y = obj.y;
    //}



    this.targetRot = obj.rot
    if (Math.abs(this.targetRot - this.rotation) > 30)
      this.rotation = obj.rot;
  }

  /**
   * 帧频函数
   * @param e
   */
  onFrame=(e)=>{


    this.frameHitB=false;
    if(this.bulletArr.length==0)
      this.bulletNumId=0;
    //攻击
    if(this.attackNum>0){
      this.attackNum--;
      this.attack();
    }
    this.moveBullet();

    //旋转  本地和服务器角度大于旋转速度按旋转速度旋转，小于直接赋值
    if(this.rotation!=this.targetRot){
      if(Math.abs(this.targetRot-this.rotation)>this.rotationSpeed){
        if(this.targetRot>this.rotation)
          this.rotation+=this.rotationSpeed;
        else
          this.rotation-=this.rotationSpeed;
      }
      else
        this.rotation=this.targetRot;
    }
    //移动

    // this.rotation=this.targetRot;

    //if(this.moveNum>=0){
    //  if(this.moveNum==0){
    //    this.x=this.targetX;
    //    this.y=this.targetY;
    //  }
    //  else
    //    this.move(this.mx, this.my);
    //  this.moveNum--;
    //}
    //else {
    //  let angle=Tools.getHD(this.rotation);
    //  let vx=Math.cos(angle)*this.speed;
    //  let vy=Math.sin(angle)*this.speed;
    //  this.move(vx,vy);
    //}





    this.x += (this.targetX - this.x)　* 0.92;
    this.y += (this.targetY - this.y)　* 0.92;

    //this.x=this.targetX;
    //this.y=this.targetY;


  }


}

export default EnemyPlane;
