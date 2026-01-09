import React from 'react';
import styled from 'styled-components';

const Switch = ({ theme, handleTheme }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input type="checkbox" onChange={(e) => handleTheme(e.target.checked)}
          checked={theme === "dark"} />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    font-size: 13px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 30px;
    box-shadow: 0 0 0 2px #f32f2150;
    border: 4px solid transparent;
    overflow: hidden;
    transition: .4s;
    background: transparent;
  }

  .slider:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background-color: #f32f21;
    transform: translateX(-50%);
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #f7b48e;
  }

  input:focus:checked + .slider {
    box-shadow: 0 0 0 2px #f32f21, 0 0 4px #777;
  }

  input:checked + .slider:before {
    transform: translateX(1.5em);
  }`;

export default Switch;
