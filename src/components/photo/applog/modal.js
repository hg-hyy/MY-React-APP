/* jshint esversion: 6 */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';

const MyModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}  size='lg'>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        <FormGroup>
        <Label for="exampleText">Log level</Label>
        <Input type="text" name="text" id="exampleText" />
        <Label for="exampleDate">Date</Label>
        <Input
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
        />
      </FormGroup>
        <FormGroup>
        <Label for="exampleText">Log Text</Label>
        <Input type="textarea" name="text" id="exampleText"  />
      </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default MyModal;