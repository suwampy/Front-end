import React, {Component} from 'react';
// 리액트 라이프 사이클
// 클래스의 경우 
// constructor -> render -> ref -> componentDidMount
// -> (setState/props 바뀔 때->shouldComponentUpdate -> render->componentDidUpdate)
// -> 부모가 나를 없앴을 때 -> componentWillUnmouont -> 소멸

const rspCoords = {
    바위 : '0',
    가위 : '-142px',
    보 : '-284px',   
}

const scores = {
    가위 : 1,
    바위 : 0,
    보 : -1,
}

const computerChoice = (imgCoord) =>{
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;
    })[0];
}

class RSP extends Component {
    state ={
        result :'',
        imgCoord:0,
        score:0
    }
    
    interval;

    componentDidMount(){ // 컴포넌트가 첫 렌더링 된 후, 여기에 비동기 요청을 많이 함
        // render가 처음 시작되고 다음으로 시작됨
        // 처음렌더될때만 실행됨 !!
        this.interval = setInterval(this.changeHand, 1000);
    }

    componentDidUpdate(){ // 리렌더링 후

    }

    componentWillUnmount(){ // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 함
        clearInterval(this.interval);
    }

    changeHand = () => {
        const {imgCoord} = this.state; // 비동기 함수 바깥에 변수를 참조하면 클로저 발생...
        if(imgCoord === rspCoords.바위){
            this.setState({
                imgCoord : rspCoords.가위,
            })
        }else if (imgCoord === rspCoords.가위){
            this.setState({
                imgCoord : rspCoords.보,
            })  
        }else if (imgCoord === rspCoords.보){
            this.setState({
                imgCoord : rspCoords.바위,
            })
        }
    }

    onClickBtn = (choice) => {
        const {imgCoord} = this.state;

        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0 ){
            this.setState({
                result : '비김',
            });
        }else if([-1,2].includes(diff)){
            this.setState((prevState)=>{
                return{
                    result: '이겼습니다',
                    score: preveState.score + 1,
                };

            })
        } else{
            this.setState((prevState)=>{
                return{
                    result: '졌습니다',
                    score: preveState.score - 1,
                };

            })
        }
        setTimeout(()=>{
            this.interval = setInterval(this.changeHand, 1000);
        },2000)

    }

    render(){
        const {result, score, img, imgCoord} = this.state;
        return (
            <>
                <div id="computer" style={{background:`url(http://en.pimg.jp/023/182/267/1/23182266.jpg) ${imgCoord} 0`}}></div>
                <div>
                    <button id="rock" className="btn" onClick={()=>onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={()=>onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={()=>onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}

export default RSP;
