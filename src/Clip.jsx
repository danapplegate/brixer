import React, { Component } from 'react';

export default class Clip extends Component {
    render = () => {
        return (
            <div>
                <strong>{this.props.name}</strong>
                <audio src={this.props.src} controls loop/>
            </div>
        )
    }
}