import React, { Component } from "react";
import PostDataService from "../services/PostDataService";
import { Redirect } from 'react-router-dom';

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.getPost = this.getPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);

        this.state = {
            currentPost: {
                id: null,
                title: "",
                description: "",
                status: ""
            },
            success: false,
            errors: {},
            confirmDelete: false,
            redirect: false
        };
    }

    componentDidMount() {
        this.getPost(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function(prevState) {
            return {
                currentPost: {
                    ...prevState.currentPost,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentPost: {
                ...prevState.currentPost,
                description: description
            }
        }));
    }

    onChangeStatus(e) {
        const status = e.target.value;

        this.setState(prevState => ({
            currentPost: {
                ...prevState.currentPost,
                status: status
            }
        }));
    }

    getPost(id) {
        PostDataService.get(id)
            .then(response => {
                this.setState({
                    currentPost: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                this.setState({
                    redirect: "/posts"
                })
            });
    }

    updatePost() {
        PostDataService.update(
            this.state.currentPost.id,
            this.state.currentPost
        )
            .then(response => {
                this.setState({
                    success: true
                });
            })
            .catch(e => {
                this.setState({
                    errors: e.response.data.messages,
                    success: false
                })
            });
    }

    deletePost() {
        PostDataService.delete(this.state.currentPost.id)
            .then(() => {
                this.setState({
                    redirect: "/posts"
                })
            })
            .catch(e => {
                this.setState({
                    errors: e.response.data.messages
                })
            });
    }


    render() {
        const { currentPost, confirmDelete, errors, success, redirect } = this.state;

        if(redirect){
            return (<Redirect to={redirect} />)
        }

        return (
            <>
            {Object.keys(errors).length !== 0 &&
            <div className="relative flex bg-white rounded overflow-hidden p-2 space-x-1">
                <div className="absolute inset-0 border-l-4 border-red-400"/>
                <div className="flex items-baseline">
                    <span className="bg-red-300 bg-opacity-50 rounded-full p-1 mr-3">
                        <svg className="h-6 w-auto text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                                  d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                                  clipRule="evenodd"/>
                        </svg>
                    </span>
                </div>
                <div className="text-left">
                    {Object.keys(errors).map((index) => (
                        <p className="leading-tight text-xs md:text-sm">
                            {errors[index]}
                        </p>
                    ))}
                </div>
            </div>
            }
            {success &&
                <div className="relative flex bg-white rounded overflow-hidden p-2 space-x-1">
                    <div className="absolute inset-0 border-l-4 border-green-400"/>
                    <div className="flex items-baseline">
                          <span className="bg-green-300 bg-opacity-50 rounded-full p-1 mr-3">
                            <svg fill="currentColor" className="h-6 w-auto text-green-400" width="24px" height="24px" viewBox="0 0 24 24"
                                 version="1.1">
                              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <polygon points="0 0 24 0 24 24 0 24"/>
                                <path
                                    d="M9.26193932,16.6476484 C8.90425297,17.0684559 8.27315905,17.1196257 7.85235158,16.7619393 C7.43154411,16.404253 7.38037434,15.773159 7.73806068,15.3523516 L16.2380607,5.35235158 C16.6013618,4.92493855 17.2451015,4.87991302 17.6643638,5.25259068 L22.1643638,9.25259068 C22.5771466,9.6195087 22.6143273,10.2515811 22.2474093,10.6643638 C21.8804913,11.0771466 21.2484189,11.1143273 20.8356362,10.7474093 L17.0997854,7.42665306 L9.26193932,16.6476484 Z"
                                    fill="currentColor" fillRule="nonzero" opacity="0.3"
                                    transform="translate(14.999995, 11.000002) rotate(-180.000000) translate(-14.999995, -11.000002) "/>
                                <path
                                    d="M4.26193932,17.6476484 C3.90425297,18.0684559 3.27315905,18.1196257 2.85235158,17.7619393 C2.43154411,17.404253 2.38037434,16.773159 2.73806068,16.3523516 L11.2380607,6.35235158 C11.6013618,5.92493855 12.2451015,5.87991302 12.6643638,6.25259068 L17.1643638,10.2525907 C17.5771466,10.6195087 17.6143273,11.2515811 17.2474093,11.6643638 C16.8804913,12.0771466 16.2484189,12.1143273 15.8356362,11.7474093 L12.0997854,8.42665306 L4.26193932,17.6476484 Z"
                                    fill="currentColor" fillRule="nonzero"
                                    transform="translate(9.999995, 12.000002) rotate(-180.000000) translate(-9.999995, -12.000002) "/>
                              </g>
                            </svg>
                          </span>
                    </div>
                    <div className="text-left">
                        Der Post wurde erfolgreich bearbeitet!
                    </div>
                </div>
            }
            { currentPost &&
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                            <div className="text-base font-medium text-gray-900">
                                Titel
                            </div>
                            <input type="text" name="title" onChange={this.onChangeTitle} value={currentPost.title} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-6">
                            <div className="text-base font-medium text-gray-900">
                                Text
                            </div>
                            <div className="mt-1">
                                <textarea id="about" name="description" onChange={this.onChangeDescription} value={currentPost.description} rows="3" className="shadow-sm focus:ring-primary-500 focus:border-primary-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Dies ist der Anfang deiner Story..." />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <fieldset>
                                <div className="text-base font-medium text-gray-900">
                                    Veröffentlichung
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input id="push-everything" name="status"
                                               checked={currentPost.status === "Draft"}
                                               onChange={this.onChangeStatus}
                                               value="Draft" type="radio"
                                               className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"/>
                                        <label htmlFor="push-everything"
                                               className="ml-3 block text-sm font-medium text-gray-700">
                                            Entwurf
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input id="push-email" name="status"
                                               value="Published" type="radio"
                                               checked={currentPost.status === "Published"}
                                               onChange={this.onChangeStatus}
                                               className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"/>
                                        <label htmlFor="push-email"
                                               className="ml-3 block text-sm font-medium text-gray-700">
                                            Veröffentlicht
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 grid grid-cols-2">
                    <button onClick={ this.updatePost } className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Speichern
                    </button>
                    <button onClick={() => {this.setState({confirmDelete: true})}} className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Löschen
                    </button>
                </div>
            </div>
            }

            {confirmDelete &&
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Post löschen
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Bist du sicher, dass du den Post löschen möchtest? Diese Aktion kann nicht widerrufen werden!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" onClick={this.deletePost} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Löschen
                            </button>
                            <button type="button" onClick={() => {this.setState({confirmDelete: false})}} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Abbrechen
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            }
            </>
        );
    }
}

export default EditPost;
