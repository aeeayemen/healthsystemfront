class MockDB {
    constructor() {
        this.init();
    }

    init() {
        // Always seed fresh data from MOCK_DATA for demo purposes
        this.seed();
    }

    seed() {
        Object.keys(MOCK_DATA).forEach(key => {
            localStorage.setItem(`hnd_${key}`, JSON.stringify(MOCK_DATA[key]));
        });
    }

    get(collection) {
        return JSON.parse(localStorage.getItem(`hnd_${collection}`)) || [];
    }

    getById(collection, id) {
        const items = this.get(collection);
        return items.find(item => item.id == id);
    }

    add(collection, item) {
        const items = this.get(collection);
        item.id = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
        items.push(item);
        this.save(collection, items);
        return item;
    }

    update(collection, id, updates) {
        const items = this.get(collection);
        const index = items.findIndex(item => item.id == id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updates };
            this.save(collection, items);
            return items[index];
        }
        return null;
    }

    delete(collection, id) {
        const items = this.get(collection);
        const newItems = items.filter(item => item.id != id);
        this.save(collection, newItems);
    }

    save(collection, data) {
        localStorage.setItem(`hnd_${collection}`, JSON.stringify(data));
    }

    // Auth Helpers
    login(email, password) {
        const users = this.get('users');
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('hnd_current_user', JSON.stringify(user));
            return user;
        }
        return null;
    }

    logout() {
        localStorage.removeItem('hnd_current_user');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('hnd_current_user'));
    }
}

const db = new MockDB();
