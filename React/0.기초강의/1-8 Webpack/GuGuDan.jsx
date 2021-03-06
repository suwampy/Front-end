// 패키지, 라이브러리
const React = require('react');
const {useState,useRef} = React;

const GuGuDan = () => {
    // use로 시작되는게 hooks !
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    // dom에 접근
    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        //setState가 없어짐
        setValue(e.target.value);
    } 

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second) {
            setResult('정답 : ' +value);
            setFirst( Math.ceil(Math.random() * 9));
            setSecond( Math.ceil(Math.random() * 9));
            setValue('');
            // current로 접근
            inputRef.current.focus();
        }else{
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    };
    
    return<><div> {first} 곱하기 {second} 는?</div>
    <form onSubmit = {onSubmitForm}>
        <input ref={inputRef} onChange={onChangeInput} vlaue = {value}/>
        <button>입력</button>
    </form>
    <div id="result">{result}</div></>;
}

module.exports = GuGuDan;
