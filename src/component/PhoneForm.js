import React, { Component } from 'react';

class PhoneForm extends Component{
    state = {
        name : '',
        phone : ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
            // input의 name 값은 e.target.name을 통해 조회 가능
        })
    }
    handleSubmit = (e) => {
        // To prevent page reloading
        e.preventDefault();
        // onCrate를 통하여 상태값을 부모에게 전달
        this.props.onCreate(this.state);
        if(this.state.name==""){
            console.log('warning');
        }
        //console.log(this.state.name);
        // 상태 초기화
        this.setState({
            name : '',
            phone : ''
        })
    }
    // input의 name 속성 이용
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input
                    placeholder="이름"
                    value={this.state.name}
                    onChange={this.handleChange}
                    name="name"
                />
                <input
                    placeholder="전화번호"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    name="phone"
                />
                <button type="submit">등록</button>
            </form>
        );
    }
}

export default PhoneForm;