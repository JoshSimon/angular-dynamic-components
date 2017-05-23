// if the user has destroyed a tab, it is removed from the "dynamicComponents" array 
// therefore it is not there anymore to be selected
destroyTab(id: string) {
    for (let i of this.arrayOfAllExistingComponents) {
        if (id == this.arrayOfAllExistingComponents[i].name) {
            delete this.arrayOfAllExistingComponents[i]
        }
    }
};


