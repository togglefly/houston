import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: false,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  handleEscape = (event) => {
    const isScape = event.keyCode === 27;

    if(!isScape) {
      return;
    }

    const isModalOpen = document
      .querySelector('#modal')
      .getAttribute('class') === 'dialog-wrapper';

    if(isModalOpen) {
      this.handleCloseModal();
    }
  }

  handleOpenModal = () => {
    this.blockScrollInProjectKeepInModal();

    const modalNode = document.querySelector('#modal');
    modalNode.setAttribute('style', 'visibility: visible;')
    modalNode.setAttribute('class', 'dialog-wrapper');

    const modalMaskNode = document.querySelector('#dialog_mask');
    modalMaskNode.setAttribute('class', 'dialog-mask dialog-mask__open');
  }

  handleCloseModal = () => {
    this.blockScrollInProjectKeepInModal(true);

    const modalNode = document.querySelector('#modal');
    modalNode.setAttribute('class', 'dialog-wrapper dialog-wrapper__closed')

    const modalMaskNode = document.querySelector('#dialog_mask');
    modalMaskNode.setAttribute('class', 'dialog-mask dialog-mask__closed');

    setTimeout(() => {
      modalNode.setAttribute('style', 'visibility: hidden;')
    }, 210);
  }

  blockScrollInProjectKeepInModal = (remover = false) => {
    const styleScriptId = 'style_script_scroll'
    let styleScript;

    if(remover) {
      // wait for animation, so modal does not get extra padding from scroll
      setTimeout(() => {
        styleScript = document.querySelector(`#${styleScriptId}`);
        styleScript.parentNode.removeChild(styleScript);
      }, 300);
      return;
    }

    styleScript = document.createElement('style');
    styleScript.setAttribute('type', 'text/css');
    styleScript.setAttribute('id', styleScriptId);
    styleScript.innerHTML = `
    body {
      overflow: hidden;
      overflow-y: hidden;
      padding-right: 0 !important;
    }
  `;
    document.head.appendChild(styleScript);
  }

  componentDidRender() {
    setTimeout(() => {

      // document
      //   .addEventListener('keydown', handleEscape)
    }, 100);
  }

  render() {
    return (
      <div>
        <button id="abrir" onClick={this.handleOpenModal}>Abrir 2</button>
        <div id="modal" class="dialog-wrapper dialog-wrapper__closed" role="dialog" aria-labelledby="modal_title"
             style={{visibility: 'hidden'}}>
          <div class="dialog-content" id="modal_content">
            <div class="dialog-header">
              <div class="dialog-header_wrapper">
                <h4 id="modal_title">Lorem Ipsum</h4>
                <button class="close-btn" id="fechar" onClick={this.handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
            <div class="dialog-body">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
          <div class="dialog-mask" id="dialog_mask" onClick={this.handleCloseModal}></div>
        </div>
      </div>
    )
  }
}
