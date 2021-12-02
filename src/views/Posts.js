import React, {Component} from "react";
import PostDataService from "../services/PostDataService";
import {NavLink} from "react-router-dom";

class Posts extends Component {

    constructor(props) {
        super(props);
        this.retrievePosts = this.retrievePosts.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        this.retrievePosts();
    }

    retrievePosts() {
        PostDataService.getAll()
            .then(response => {
                this.setState({
                    posts: response.data
                });
            })
            .catch(e => {
            });
    }

    refreshList() {
        this.retrievePosts();
    }

    render() {
        const { posts } = this.state;

        return (
            <>
            <div className="container max-w-7xl mx-auto">
                 <div className="flex flex-col">
                     <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                         <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                             <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Titel
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Erstellt am
                                    </th>
                                    <th scope="col" className="relative px-6 py-3 text-right">
                                        <button onClick={ this.refreshList } className={"text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"}>Aktualisieren</button>
                                        <NavLink to={'/posts/create'}  className="text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 px-3 py-2 rounded-md text-base font-medium">
                                            Erstellen
                                        </NavLink>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {posts && posts.map((post, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{ post.id }</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{ post.title }</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            { post.status === "Draft"
                                                ?
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Entwurf
                                                    </span>
                                                :
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" v-if="post.status === 'Published'">
                                                        Veröffentlicht
                                                    </span>
                                            }

                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            { post.created_at }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <NavLink to={'/posts/' + post.id} className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Bearbeiten</NavLink>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    }
}

export default Posts;
