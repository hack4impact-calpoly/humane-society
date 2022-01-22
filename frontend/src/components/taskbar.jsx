import React from 'react';
import { Link } from 'react-router-dom';

export default function TaskBar() {
  return (
    <header className="taskBar">
      <nav>
        <Link to="/tasks">Tasks</Link>
        <Link to="/availability">Availability</Link>
        <Link to="/request-off">Request Off</Link>
      </nav>
    </header>
  )
}