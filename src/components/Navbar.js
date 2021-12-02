/* This example requires Tailwind CSS v2.0+ */
import { Disclosure} from '@headlessui/react'
import {NavLink, Route, Switch, useLocation} from 'react-router-dom'
import logo from '../images/ba-logo-monochrome.svg'
import tw from 'twin.macro'
import Home from "../views/Home";
import Posts from "../views/Posts";
import CreatePost from "../views/CreatePost";
import EditPost from "../views/EditPost";
import React from "react";

export default function Navbar() {
    const location = useLocation();

    const pathnameMap = (path) => {
        switch (path) {
            case "/":
                return "Home"
            case "/posts":
                return "Alle Posts"
            case "/posts/create":
                return "Post erstellen"
            default:
                break;
        }

        if(path.includes('/posts/'))
            return "Post bearbeiten"

        return path;
    }

    return (
      <>
        <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
            <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8" css={tw`border-4 border-red-900`}>
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                        <img
                            className="h-8 w-auto"
                            src={logo}
                            alt="Bachelorarbeit - Niklas Schmolke"
                        />
                        </div>
                        <div className="sm:ml-6">
                        <div className="flex space-x-4">
                            <NavLink
                                to={"/"}
                                exact
                                className={'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'}
                                activeClassName={'bg-gray-900 text-white'}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to={"/posts"}
                                className={'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'}
                                activeClassName={'bg-gray-900 text-white'}
                            >
                                Posts
                            </NavLink>
                        </div>
                    </div>
                </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <span className="text-white">React Projekt</span>
                    </div>
                </div>
            </div>
            </>
        )}
        </Disclosure>
          <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold text-gray-900">{ pathnameMap(location.pathname) }</h1>
              </div>
          </header>
          <main>
              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <div className="px-4 py-6 sm:px-0">
                      <Switch>
                          <Route name={'Test'} exact path="/" component={Home}/>
                          <Route exact path="/posts" component={Posts}/>
                          <Route exact path="/posts/create" component={CreatePost}/>
                          <Route path="/posts/:id" component={EditPost}/>
                      </Switch>
                  </div>
              </div>
          </main>
    </>
  )
}
