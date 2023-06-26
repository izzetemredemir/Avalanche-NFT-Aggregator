class PriorityQueue<T> {
  private items: { value: T; priority: number }[];

  constructor() {
    this.items = [];
  }

  enqueue(value: T, priority: number): void {
    const newItem = { value, priority };
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (priority > this.items[i].priority) {
        this.items.splice(i, 0, newItem);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(newItem);
    }

    console.log(`Enqueue: ${value} with priority ${priority}`);
  }
  dequeue(): T | undefined {
    const removedItem = this.items.shift();
    if (removedItem) {
      console.log(
        `Dequeue: ${removedItem.value} with priority ${removedItem.priority}`
      );
      return removedItem.value;
    }
    return undefined;
  }
}

// Öncelikli kuyruk örneği
const priorityQueue = new PriorityQueue<string>();
// Öğeleri öncelikli kuyruğa ekleme
priorityQueue.enqueue("A", 2);
priorityQueue.enqueue("B", 1);
priorityQueue.enqueue("C", 1);
priorityQueue.enqueue("D", 3);

// En yüksek öncelikli öğeleri öncelikli kuyruktan alma ve kaldırma
while (true) {
  const dequeuedItem = priorityQueue.dequeue();
  if (dequeuedItem === undefined) {
    break;
  }
}
