import React, {Component} from 'react';

class PhoneInfo extends Component{
    static defaultProps = {
        info : {
            name : '이름',
            phone : '010-0000-0000',
            id : 0
        }
    }
    state = {
        // 수정 버튼을 눌렀을 때, editing값을 true로 설정
        // 이 값이 true일 때에는, 기존에 텍스트 형태로 보여주던 값들을 input 형태로 보여주게 됨
        editing : false,
        // input의 값은 유동적일
        // input 값을 담기 위해 각 필드를 위한 값도 설정
        name : '',
        phone : ''
    }
    shouldComponentUpdate(nextProps, nextState){
        // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
        if(!this.state.editing && !nextState.editing && nextProps.info === this.props.info){
            return false;
        }
        // 나머지 경우엔 리렌더링함
        return true;
    }
    handleRemove = () => {
        // 삭제 버튼이 클릭되면 onRemove에 id넣어서 호출
        const {info, onRemove} = this.props;
        onRemove(info.id);
    }
    // editing 값을 반전시키는 함수
    handleToggleEdit = () => {
        const {editing} = this.state;
        this.setState({editing : !editing});
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name] : value
        });
    }
    componentDidUpdate(prevProps, prevState){
        const {info, onUpdate} = this.props;
        if(!prevState.editing && this.state.editing){
            this.setState({
                name: info.name,
                phone: info.phone
            })
        }
        if(prevState.editing && !this.state.editing){
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            });
        }
    }
    render() {
        console.log('render PhoneInfo' + this.props.info.id);
        const style = {
            border : '1px solid black',
            padding : '8px',
            margin : '8px'
        };
        const {editing} = this.state;
        if(editing){ // 수정모드
            return(
                <div style={style}>
                    <div>
                        <input
                            value={this.state.name}
                            name="name"
                            placeholder="이름"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            value={this.state.phone}
                            name="phone"
                            placeholder="전화번호"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button onClick={this.handleToggleEdit}>적용</button>
                    <button onClick={this.handleRemove}>삭제</button>
                </div>
            );
        }
        // 일반모드
        const {name, phone} = this.props.info;
        return (
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleToggleEdit}>수정</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
    }
}
export default PhoneInfo;