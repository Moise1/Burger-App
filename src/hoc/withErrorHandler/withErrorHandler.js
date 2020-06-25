import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import {Aux} from './../Aux/Aux'

const withErrorHandler = (WrappedComponet, axios) =>{
    return class extends React.Component {

        state = {
            error: null
        }

        // Checking whether we have an error on the backend while sending/retreiving data.
        componentWillMount(){
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, serverError =>{
                this.setState({error: serverError})
            })
        }

        // Removing dead, absolete interceptors.
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorRecognizedHandler = () =>{
            this.setState({error: null});
        }

        render(){
            return (
                <Aux>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorRecognizedHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponet {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;