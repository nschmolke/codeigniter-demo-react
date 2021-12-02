import React, { Component } from "react";
import PostDataService from "../services/PostDataService";
import {NavLink} from "react-router-dom";

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.savePost = this.savePost.bind(this);
        this.newPost = this.newPost.bind(this);

        this.state = {
            title: "",
            description: "",
            status: "",

            success: false,
            errors: []
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    savePost() {
        var data = {
            title: this.state.title,
            description: this.state.description,
            status: this.state.status
        };


        PostDataService.create(data)
            .then(response => {
                this.setState({
                    title: "",
                    description: "",
                    status: "",

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

    newPost() {
        this.setState({
            title: "",
            description: "",
            status: "",

            success: false,
            errors: []
        });
    }

    render() {
        const { errors, success } = this.state;

        return (
                <>
                {Object.keys(errors).length !== 0 &&
                <div className="relative flex bg-white rounded overflow-hidden p-2 space-x-1">
                    <div className="absolute inset-0 border-l-4 border-red-400"/>
                    <div className="flex items-baseline">
                        <span className="bg-red-300 bg-opacity-50 rounded-full p-1 mr-3">
                            <svg className="h-6 w-auto text-red-400" fill="currentColor" width="24px" height="24px"
                                 viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
                                   fill="currentColor">
                                  <rect x="0" y="7" width="16" height="2" rx="1"/>
                                  <rect opacity="0.3"
                                        transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000) " x="0"
                                        y="7" width="16" height="2" rx="1"/>
                                </g>
                              </g>
                            </svg>
                        </span>
                    </div>
                    <div className="text-left">
                        {Object.keys(errors).map((index) => (
                            <span className={"block"}>
                                {errors[index]}
                            </span>
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
                            Der Post wurde erfolgreich erstellt!
                        </div>
                    </div>
                }

                <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6">
                                <div className="text-base font-medium text-gray-900">
                                    Titel
                                </div>
                                <input type="text" name="title" onChange={this.onChangeTitle} value={this.state.title} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                            <div className="col-span-6">
                                <div className="text-base font-medium text-gray-900">
                                    Text
                                </div>
                                <div className="mt-1">
                                    <textarea id="description" name="description" onChange={this.onChangeDescription} value={this.state.description} rows="3" className="shadow-sm focus:ring-primary-500 focus:border-primary-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Dies ist der Anfang deiner Story..."/>
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
                                                   onChange={this.onChangeStatus}
                                                   checked={'checked'}
                                                   value="Draft" type="radio"
                                                   className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"/>
                                            <label htmlFor="push-everything"
                                                   className="ml-3 block text-sm font-medium text-gray-700">
                                                Entwurf
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="push-email" name="status"
                                                   onChange={this.onChangeStatus}
                                                   value="Published"
                                                   type="radio"
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
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button onClick={this.savePost} className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Speichern
                        </button>
                        <NavLink to={'/posts'} className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Abbrechen
                        </NavLink>
                    </div>
                </div>
                </>
        );
    }
}

export default CreatePost;
