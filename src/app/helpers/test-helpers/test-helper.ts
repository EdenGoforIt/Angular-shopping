import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

const findElement = <T>(
  fixture: ComponentFixture<T>,
  testId: string
): DebugElement => {
  return fixture.debugElement.query(By.css(`[data-test-id="${testId}"]`));
};

// function findEl<T>(fixture: ComponentFixture<T>, testId: string): DebugElement {
//   return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
// }

const click = <T>(fixture: ComponentFixture<T>, testId: string) => {
  const element = findElement(fixture, testId);
  const event = makeClickEvent(element.nativeElement);
  element.triggerEventHandler('click', event);
};

const expectText = <T>(
  fixture: ComponentFixture<T>,
  testId: string,
  text: string
) => {
  const element = findElement(fixture, testId);
  const actualText = element.nativeElement.textContent;
  expect(actualText).toBe(text);
};

const makeClickEvent = (target: EventTarget): Partial<MouseEvent> => {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0,
  };
};

export { findElement, expectText, click };
