import React from 'react';
import '../css/froala_editor.min.css';
import '../css/froala_editor.pkgd.min.css';
import  '../css/froala_style.min.css'
import FroalaEditor from 'react-froala-wysiwyg';
import '../css/bootstrap.min.css';
import FroalaEditorView from 'react-froala-wysiwyg';

class EditorComponent extends React.Component{
    constructor(){
        super();
        // this.handleModelChange = this.handleModelChange.bind(this);
        
        this.state = {
            modelNew: 'Example text'
        };
    }

    handleModelChange=(modelNew)=>{
        this.setState({
            modelNew:modelNew
        });
        this.props.updateState(this.state.modelNew);
    }

    render(){
        return(
            <div>
                <FroalaEditor
                    tag='textarea'
                    config={this.config}
                    model={this.state.modelNew}
                    onModelChange={this.handleModelChange}/>
                <FroalaEditorView model={this.state.modelNew}/>
            </div>
        );
}
}

export default EditorComponent;