/*
*	Author: Jean-Pierre Sierens
*	===========================================================================
*/

import React from 'react';
import ReactDOM from 'react-dom';
import VideoList from './VideoList';
import {data} from './data';

// Filterable CheatSheet Component
ReactDOM.render( <VideoList data={data}/>, document.getElementById('video-list') );