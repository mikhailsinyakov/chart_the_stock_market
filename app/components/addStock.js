import React from 'react';

class AddStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    
    handleChange(e) {
        const value = e.target.value.toUpperCase();
        this.setState({value});
    }
    
    handleKeyPress(e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.props.addStock(this.state.value);
            this.setState({value: ''});
        }
    }
    
    handleSubmit() {
        this.props.addStock(this.state.value);
        this.setState({value: ''});
    }
    
    render() {
        return (
            <form>
                <input type="text" onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.state.value}/>
                <button type="button" onClick={this.handleSubmit}>Add a stock</button>
            </form>
        );
    }
}

export default AddStock;