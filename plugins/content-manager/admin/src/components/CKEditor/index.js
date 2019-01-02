import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {
EditorState,
} from 'draft-js';

class App extends Component {

constructor(props) {
     super(props);
     this.state = {
          editorState: EditorState.createEmpty(),
          };
     this.setRef=React.createRef()
   }

onChange=(event)=>{
       this.props.onChange({
       target: {
           name: this.props.name,
           type: this.props.type,
           value: this.setRef.current.editor.getData()
               }
            })
         }

render() {
    return (
      <div className="App">
      <br></br>
       <CKEditor
        onInit={ editor => {
            editor.ui.view.editable.element.parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.view.editable.element
            );
        } }
        editor={ DecoupledEditor }
        onChange={this.onChange.bind(this)}
        ref={this.setRef}
        data={this.props.value} 
        config={{
            cloudServices: {
            tokenUrl: 'https://36013.cke-cs.com/token/dev/Nqf3gUaKVZ1sW5tWGCVyWiDewmZRACN3mhckafwJlhPb4VQpGsnLeybgbNVE',
            uploadUrl: 'https://36013.cke-cs.com/easyimage/upload/'
            }
            }}
     
    />
    </div>
);
}
}
export default App;
