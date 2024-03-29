import React, { Component } from 'react'
import PayloadDescriptorService from '../services/PayloadDescriptorService';

class CreatePayloadDescriptorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
                payloadType: '',
                objectType: ''
        }
        this.changepayloadTypeHandler = this.changepayloadTypeHandler.bind(this);
        this.changeObjectTypeHandler = this.changeObjectTypeHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            PayloadDescriptorService.getPayloadDescriptorById(this.state.id).then( (res) =>{
                let payloadDescriptor = res.data;
                this.setState({
                    payloadType: payloadDescriptor.payloadType,
                    objectType: payloadDescriptor.objectType
                });
            });
        }        
    }
    saveOrUpdatePayloadDescriptor = (e) => {
        e.preventDefault();
        let payloadDescriptor = {
                payloadDescriptorId: this.state.id,
                payloadType: this.state.payloadType,
                objectType: this.state.objectType
            };
        console.log('payloadDescriptor => ' + JSON.stringify(payloadDescriptor));

        // step 5
        if(this.state.id === '_add'){
            payloadDescriptor.payloadDescriptorId=''
            PayloadDescriptorService.createPayloadDescriptor(payloadDescriptor).then(res =>{
                this.props.history.push('/payloadDescriptors');
            });
        }else{
            PayloadDescriptorService.updatePayloadDescriptor(payloadDescriptor).then( res => {
                this.props.history.push('/payloadDescriptors');
            });
        }
    }
    
    changepayloadTypeHandler= (event) => {
        this.setState({payloadType: event.target.value});
    }
    changeObjectTypeHandler= (event) => {
        this.setState({objectType: event.target.value});
    }

    cancel(){
        this.props.history.push('/payloadDescriptors');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add PayloadDescriptor</h3>
        }else{
            return <h3 className="text-center">Update PayloadDescriptor</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> payloadType: </label>
                                            #formFields( $attribute, 'create')
                                            <label> ObjectType: </label>
                                            #formFields( $attribute, 'create')
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdatePayloadDescriptor}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                   </div>
            </div>
        )
    }
}

export default CreatePayloadDescriptorComponent
