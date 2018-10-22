import React, { Component, createRef } from 'react';
import Clip from './Clip';
import { Form } from 'react-bootstrap';

const audioContext = new AudioContext();

export default class ClipList extends Component {

    inputRef = createRef();

    onFileSelected = (event) => {
        
        const files = event.currentTarget.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                this.props.addClips([{
                    name: file.name,
                    src: reader.result
                }]);
            };
            reader.readAsDataURL(file);
        }
        if (this.inputRef.current) {
            this.inputRef.current.value = "";
        }
    }

    render = () => {
        const { clips } = this.props;
        return (
            <div className="clip-list">
                <Form>
                    <Form.Group controlId="fileInput">
                        <Form.Label>Add a clip</Form.Label>
                        <Form.Control ref={this.inputRef} onChange={this.onFileSelected} multiple type="file" />
                    </Form.Group>
                </Form>
                {!!clips.length && (
                    <div>
                        {clips.map(clip => (
                            <Clip key={clip.name} name={clip.name} src={clip.src} />
                        ))}
                    </div>
                )}
            </div>
        );
    }
}