export class BallChain{
    constructor(){
        this.head = null;
        this.tail = null;
    }
    dumpList() {
        let a_node = this.head;
        while (a_node != null) {
          console.log(`
          payload: ${a_node.data}
          -----------
            prev: ${a_node.prev?.data}
            next: ${a_node.next?.data}
          `);
          // find next payload
          a_node = a_node.next;
        }
    }
    add(payload) {
        if(!this.head) {
            this.head = payload;
            this.tail = payload;
        } else {
            this.tail.next = payload;
            payload.prev = this.tail;
            this.tail = payload;
        }
        payload.next = null; 
    }
    addLast(payload) {
        if(!this.head) {
            this.head = payload;
            this.tail = payload;
        } else {
            this.tail.next = payload;
            payload.prev = this.tail;
            this.tail = payload;
        }
        payload.next = null; 
    }

    addFirst(payload){
        if(!this.head){
            this.head = payload;
            this.tail = payload;
        } else {
            payload.next = this.head;
            this.head.prev = payload;
            this.head = payload;
        }
        payload.prev = null;
    }
    removeLast(){
        if (!this.head) {
            return console.log("Empty list.");
        }
        if(this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return;
        }
        this.tail = this.tail.prev;
        this.tail.next = null;
    }
    removeFirst(){
        if(!this.head){
            return console.log("Empty list.");
        }
        if(this.head === this.tail){
            this.head = null;
            this.tail = null;
            return
        }
        this.head = this.head.next;
        this.head.prev = null;
    }
    removeNode(payload){
        if(!this.head){
            return console.log("Empty list.");
        }
        let currentNode = this.head;
        while(currentNode){
            if(currentNode.data === payload.data){
                if(currentNode === this.head){
                    this.head = currentNode.next;
                    if(this.head){
                        this.head.prev = null;
                    } else{
                        this.tail = null;
                    }
                }
                if(currentNode === this.tail){
                    this.tail = currentNode.prev;
                    if (this.tail) {
                        this.tail.next = null;
                    } else{
                        this.head = null; 
                    }
                }
                if(currentNode.prev && currentNode.next){
                    currentNode.prev.next = currentNode.next;
                    currentNode.next.prev = currentNode.prev;
                }
                currentNode.prev = null;
                currentNode.next = null;
                return;
            }
            currentNode = currentNode.next;
        }
        console.log("The node you're looking for does not exist.");
    }
    insertBeforeNode(payload, existingNode){
        if(!this.head){
            return console.log("Empty list.");
        }
        let currentNode = this.head;
        while(currentNode){
            if(currentNode.data === existingNode.data){
                if(currentNode.prev === null){
                    payload.next = this.head;
                    this.head.prev = payload;
                    this.head = payload;
                    payload.prev = null;
                    return;
                }
                payload.prev = currentNode.prev;
                currentNode.prev.next = payload;
                payload.next = currentNode;
                currentNode.prev = payload;
                return;
            }
            currentNode = currentNode.next;
        }
        console.log("The node you're looking for does not exist.")
    }
    insertAfterNode(payload, existingNode){
        if(!this.head){
            return console.log("Empty list.");
        }
        let currentNode = this.head;
        while(currentNode){
            if(currentNode.data === existingNode.data){
                if(currentNode.next === null){
                    this.tail.next = payload;
                    payload.prev = this.tail;
                    this.tail = payload;
                    payload.next = null;
                    return;
                }
                payload.prev = currentNode;
                payload.next = currentNode.next;
                currentNode.next = payload;
                if(payload.next){
                    payload.next.prev = payload;
                } else {
                    this.tail = payload;
                }
                return;
            }
            currentNode = currentNode.next;
        }
        console.log("The node you're looking for does not exist.");
    }
    indexOf(node){
        if(!this.head){
            return "Empty list.";   
        }
        let currentNode = this.head;
        let index = 0;
        while(currentNode){
            if(currentNode.data === node.data){
                return index;
            }
            index++;
            currentNode = currentNode.next;
        }
        return "The node you're looking for does not exist.";
    }
    
    nodeAt(index){
        if(!this.head){
            return -1;
        }
        let currentNode = this.head;
        let currentIndex = 0;
        while(currentNode && currentIndex < index){
            currentIndex++;
            currentNode = currentNode.next;
        }
        if(currentNode){
            return currentNode;
        } else{
            return "The node you're looking for does not exist.";
        }
    }
    swapNodes(nodeA, nodeB){
        let nodeACheck = false;
        let nodeBCheck = false;
        let currentNode = this.head;
        while(currentNode){
            if(currentNode === nodeA){
                nodeACheck = true;
            }
            if(currentNode === nodeB){
                nodeBCheck = true;
            }
            currentNode = currentNode.next;
        }
        if(nodeACheck && nodeBCheck){
            const dataA = nodeA.data;
            nodeA.data = nodeB.data;
            nodeB.data = dataA;
            return;
        }
        console.log("Couldn't find both nodes.")
    }
    clear(){
        let currentNode = this.head;
        while (currentNode) {
            let nextNode = currentNode.next;
            currentNode.prev = null;
            currentNode.next = null;
            currentNode = nextNode;
        }
        this.head = null;
        this.tail = null;
    }
    get(index){
        if(!this.head){
            return -1;
        }
        let currentNode = this.head;
        let currentIndex = 0;
        while(currentNode && currentIndex < index){
            currentIndex++;
            currentNode = currentNode.next;
        }
        if(currentNode){
            return currentNode;
        } else{
            return "The node you're looking for does not exist.";
        }
    }
    insertAfter(index, payload){
        if(!this.head){
            return console.log("Empty list.");
        }
        let node = this.get(index);
        if(node.next === null){
            this.tail.next = payload;
            payload.prev = this.tail;
            this.tail = payload;
            payload.next = null;
            return;
        }
        payload.prev = node;
        payload.next = node.next;
        node.next = payload;
        if(payload.next){
            payload.next.prev = payload;
        } else {
            this.tail = payload;
        }
    }
    insertBefore(index, payload){
        if(!this.head){
            return console.log("Empty list.");
        }
        let node = this.get(index);
        if(node.prev === null){
            payload.next = this.head;
            this.head.prev = payload;
            this.head = payload;
            payload.prev = null;
            return;
        }
        payload.prev = node.prev;
        node.prev.next = payload;
        payload.next = node;
        node.prev = payload;
    }
    remove(index){
        if(!this.head){
            return console.log("Empty list.");
        }
        let node = this.get(index);
        if(node === this.head){
            this.head = node.next;
            if(this.head){
                this.head.prev = null;
            } else{
                this.tail = null;
            }
        }
        if(node === this.tail){
            this.tail = node.prev;
            if (this.tail) {
                this.tail.next = null;
            } else{
                this.head = null; 
            }
        }
        if(node.prev && node.next){
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        node.prev = null;
        node.next = null;
    }
    first(){
        if(!this.head){
            return console.log("Empty list.")
        }
        console.log(this.head);
    }
    last(){
        if(!this.head){
            return console.log("Empty list.")
        }
        console.log(this.tail);
    }
    length() {
        let count = 0;
        let currentNode = this.head;
        while (currentNode) {
            count++;
            currentNode = currentNode.next;
        }
        return count;
    }
}