import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormControl, InputGroup } from 'react-bootstrap';
import React, { useState, useEffect } from "react"


interface NewPerson {
  id: number | null,
  name: string,
  surname: string,
  dateOfBirth: string,
  isTeacher: boolean,
  classId: number | null,
}


const SandboxForm = ({personList, classList}) => {
  const [selectedPerson, setSelectedPerson] = useState<Person>({id: null, name: '', surname: '', dateOfBirth: '', isTeacher: false, classId: null})
  const [selectedClass, setSelectedClass] = useState<SchoolClass>({id: null, grade: 1, letter: 'A'})


  useEffect(() => {
    if(selectedPerson!=null) {
      setSelectedClass(selectedPerson.classId ? selectedPerson.classId.toString() : "0")
    } else {
      setSelectedClass("0")
    }

  }, [selectedPerson])

  const getPerson = (personId) => {
    const persons = personList.filter(p => personId === p.id.toString());
    if(persons.length===0) {
      return null;
    }
    return persons[0];
  }

  const PersonSelect = (persons:SchoolClass[]) => <Form.Select value={selectedPerson ? selectedPerson.id.toString() : "0"} size="sm" aria-label="Default select example" 
                                        onChange={(e) => setSelectedPerson(getPerson(e.currentTarget.value))}>
                                          <option value="0">New Person</option>
                                          {persons.map(p => 
                                              <option value={p.id}>{p.name} {p.surname}</option>
                                          )}
                                      </Form.Select>

  const ClassSelect = ({classes}) => <Form.Select value={selectedClass} 
                                      size="sm" aria-label="Default select example" 
                                      onChange={(e)=>setSelectedClass(e.currentTarget.value)}>
                                        <option value="0">New Classroom</option>
                                        {classes.map(c =>
                                          <option value={c.id}>{c.grade}. {c.letter}</option>
                                          )}
                                        </Form.Select>

  return (
    <Form>
      <h2>Add Person</h2>
      <PersonSelect persons={personList}/>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control value={selectedPerson.name} size="sm" type="text" placeholder="Enter name" onChange={(e) => setSelectedPerson({...selectedPerson, name: e.currentTarget.value})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSurname">
        <Form.Label>Surname</Form.Label>
        <Form.Control value={selectedPerson.surname} size="sm" type="text" placeholder="Enter surname" onChange={(e) => setSelectedPerson({...selectedPerson, surname: e.currentTarget.value})} />
      </Form.Group>
      <ClassSelect classes={classList}/>
      <InputGroup size="sm" hidden={selectedClass.id!=null} className="w-50">
        <InputGroup.Text>Class</InputGroup.Text>
        <Form.Control
          type="number"
          class="form-control"
          min="1" step="1" max="12" 
          placeholder="Year"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text>.</InputGroup.Text>
        <Form.Control
          as="select"
          placeholder="Letter"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2">
          <option>{"A"}</option>
          <option>{"B"}</option>
          <option>{"C"}</option>
        </Form.Control>
      </InputGroup>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check checked={selectedPerson.isTeacher} disabled={selectedPerson!=null} type="switch" label="Is a teacher?" onClick={() => setSelectedPerson({...selectedPerson, isTeacher:!selectedPerson.isTeacher})}/>
      </Form.Group>
      
      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SandboxForm;