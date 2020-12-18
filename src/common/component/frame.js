import React,{useEffect,useRef} from 'react';
import {useInnerHeight} from "../hook/index";
import BScroll from "better-scroll";
export default function Frame(props){
    const innerH = useInnerHeight();
    const wrap = useRef(null);
    let {pullUp,getData} = props;
    console.log(props);
    useEffect(()=>{
        window.pageScroll = new BScroll(wrap.current,{
            preventDefaultException:{
                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/,
                className: /(^|\s)work_a(\s|$)/ 
            },
            // mouseWheel: true,//开启鼠标滚动，可设为{}并配置
            // probeType: 3,//监听滚动
            pullUpLoad: pullUp?{threshold:200}:false
        });
        window.pageScroll.on("pullingUp",()=>{
            //console.log("上滑加载更多");
            getData().then(res=>{
                if(res){
                    window.pageScroll.finishPullUp();
                    window.pageScroll.refresh();
                } else {
                    window.pageScroll.closePullUp();
                }
               
            });
        })
        return ()=>{
            window.pageScroll = null;
        }
    },[]);
    return ( 
        <div 
            id="main" 
            style={{
                height: innerH
            }}
        >
            <div 
                className="pageWrap"
                ref = {wrap}
            >
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    );
} 