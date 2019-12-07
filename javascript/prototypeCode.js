function myPrototypeof (left, right) {
    let proto = left.__proto__;
    let prototype = right.__proto__;

    while(true) {
        if(proto === null) return false;
        if(proto === prototype ) return true;
        proto = proto.__proto__;
    }
}