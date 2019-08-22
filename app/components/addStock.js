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
        const style = {fontSize: "12px", marginTop: "10px"};
        
        const error = this.props.addingError 
                        ? <p className="text-warning" style={style}>{this.props.addingError}</p>
                        : null;
        
        return (
            <div className="stock-item bg-secondary">
                <form>
                    <input type="text" onKeyPress={this.handleKeyPress} 
                            onChange={this.handleChange} value={this.state.value}
                            style={{width: this.props.lang === 'ru' ? '40%' : '65%'}}
                            className="form-control form-control-sm"/>
                    <button type="button" onClick={this.handleSubmit}
                            className="btn btn-success btn-sm">
                        {this.props.lang === 'ru' ? 'Добавить' : 'Add'}
                    </button>
                </form>
                {error}
            </div>
        );
    }
}

export default AddStock;