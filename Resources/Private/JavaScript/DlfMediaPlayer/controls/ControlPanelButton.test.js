/**
 * @jest-environment jsdom
 */

// @ts-check

import { describe, expect, test } from '@jest/globals';
import ControlPanelButton from './ControlPanelButton';
import { createShakaPlayer } from './test-util';

describe('ControlPanelButton', () => {
  const shk = createShakaPlayer();

  test('basic', () => {
    let clicked = 0;
    const buttonContainer = document.createElement('div');
    const button = new ControlPanelButton(buttonContainer, shk.controls, {
      material_icon: 'info',
      title: "Do it now",
      onClick: () => {
        clicked++;
      },
    });
    const domButton = buttonContainer.querySelector('button');
    expect(domButton?.ariaLabel).toBe("Do it now");
    domButton?.click();
    expect(clicked).toBe(1);
  });

  test('allows to omit title', () => {
    const buttonContainer = document.createElement('div');
    const button = new ControlPanelButton(buttonContainer, shk.controls);
    const domButton = buttonContainer.querySelector('button');
    expect(domButton?.ariaLabel).toBe("");
  });
});
