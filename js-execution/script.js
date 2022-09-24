// console.log("JS");


const a = () => {
    setTimeout(() =>{
        console.log("a");
    },2000);
}

const b = () => {
    console.log("b");
};

const c = () => {
    a();
    b();
};


c();