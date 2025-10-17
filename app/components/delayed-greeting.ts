import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export interface DelayedGreetingSignature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class DelayedGreeting extends Component<DelayedGreetingSignature> {
  @tracked displayText: string | null = null;

  constructor(owner: unknown, args: DelayedGreetingSignature['Args']) {
    super(owner, args);
    this.updateDisplayTextTask.perform();
  }

  updateDisplayTextTask = task(async () => {
    await timeout(2000);
    this.displayText = 'Hello from Ember Concurrency!';
  });
}
