import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [
{
  'id' : 1,
  'image' : 'https://placeimg.com/64/64/any',
  'name' : '홍길동',
  'birthday' : '961222',
  'gender' : '남자',
  'job' : '대학생'
},
{
  'id' : 2,
  'image' : 'https://placeimg.com/64/64/any',
  'name' : '김길동',
  'birthday' : '961222',
  'gender' : '남자',
  'job' : '대통령'
},
{
  'id' : 3,
  'image' : 'https://placeimg.com/64/64/any',
  'name' : '박길동',
  'birthday' : '961222',
  'gender' : '여자',
  'job' : '영업직'
}
]

class App extends Component{
  render() {
    return (
      <div>
        {customers.map(c => { return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>); })}
      </div>
    );
  }
}
export default App;
