/**
 * Created by Administrator on 2017/2/16.
 */
/**
 * 飞机传输数据类
 */

class PSData{

  constructor(){

    if(PSData.ObjIndex==null){
      PSData.ObjIndex={};
      for(let s in PSData.hashMap){
        PSData.ObjIndex[PSData.hashMap[s]]=s;
      }
    }

    this.init();
  }

  init(){
    /**
     * 用户名
     * @type {string}
     */
    this.Name='';
    //数据名
    this.KPI='planWalk';
    /**
     * x位置
     * @type {number}
     */
    this.x=0;
    /**
     * y位置
     * @type {number}
     */
    this.y=0;
    /**
     * 角度
     * @type {number}
     */
    this.rot=0;
    /**
     * 时间毫秒
     * @type {number}
     */
    this.time=0;
    /**
     * 攻击 1-攻击 0-未攻击
     * @type {number}
     */
    this.attack=0;
    /**
     * 碰撞对象 Obj.子弹id=飞机name
     * @type {{}}
     */
    this.hitObj={};
  }

  /**
   *  obj       需要转换的数据
   * @param sd  是否为往服务器发送的数据
  */
  static toggleObj(obj,sd = true){
      let o = {};
      for(let str in obj){
        if(sd){

          let v = obj[str];
          //如果v有判断条件,单独判断
          if(v.indexOf(' ')>-1&&v.split(' ')[1] == v){
            o[PSData.hashMap[str]] = v;
          }
          else{
            //如果是v是数字或者不是空的对象可以上传
            typeof v == 'number'?v = parseInt(v):typeof v == 'object'&&JSON.stringify(v).length==2?v = null:v = v;
            v!=null&&(o[PSData.hashMap[str]] = v);
          }

        }
        else {
          //如果str值符合hashMap[str1],则返回对应的key(str1)
          for(let str1 in PSData.hashMap){
            if(PSData.hashMap[str1] === str) o[str1] = obj[str];continue;
          }
        }
      }
      return o;
  }

  /**
   * 将一个obj转换成PSData
   * @param obj
   */
  static shiftObj(obj) {
    let pd = new PSData();
    for (let s in obj) {
      pd[PSData.ObjIndex[s]] = obj[s];

      if (psdata.Name != null) {

        obj[PSData.PSDataIndex['Name']] = psdata.Name;
        obj[PSData.PSDataIndex['KPI']] = psdata.KPI;
        obj[PSData.PSDataIndex['x']] = Math.round(psdata.x);
        obj[PSData.PSDataIndex['y']] = Math.round(psdata.y);
        obj[PSData.PSDataIndex['rot']] = Math.round(psdata.rot);
        obj[PSData.PSDataIndex['time']] = psdata.time;
        if (psdata.attack == 1)
          obj[PSData.PSDataIndex['attack']] = Math.round(psdata.attack);
        if (JSON.stringify(psdata.hitObj).length > 2)
          obj[PSData.PSDataIndex['hitObj']] = psdata.hitObj;
        return obj;

      }
      else {
        obj = psdata;
        let pd = new PSData();
        for (let s in obj) {
          pd[PSData.ObjIndex[s]] = obj[s];
        }
        return pd;
      }

    }


  }

}

/**
 *上传数据索引  obj.上传数据属性名=PSData属性名
 * @type {{}}
 */
PSData.ObjIndex=null;
/**
 * PSData索引，obj.PSData属性名=上传数据属性名
 * @type {{}}
 */
PSData.hashMap={Name:'n',KPI:'KPI',x:'x',y:'y',rot:'r',time:'t',attack:'a',hitObj:'h'};
PSData.PSDataIndex={Name:'n',KPI:'KPI',x:'x',y:'y',rot:'r',time:'t',attack:'a',hitObj:'h'};

export default PSData;
