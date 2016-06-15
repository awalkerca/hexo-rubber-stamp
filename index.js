
var randomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
var getRotation = function () {
    var rotations = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10'];
    return randomElement(rotations);
}

var getColor = function () {
    var colors = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
    return randomElement(colors);
}

var getShape = function () {
    var shapes = ['circle', 'square', 'rectangle'];
    return randomElement(shapes);
}

var activeTags = function () {
    var tagData = hexo.locals.get('tags').data;
    var tags = [];

    for(var key in tagData) {
        tags.push(tagData[key].name);
    }

    return tags;
}

var defaultTag = 'travel';

hexo.extend.tag.register('rubber_stamp', function(args, content){

    var text = args[0];
    var year = args[1];
    var tag = args[2] || text;
    var shape = args[3] || 'rectangle';
    var subYear = year.split('').slice(2).join('');


    var classes = ['rubber-stamp'];
    var output = '';
    var url;

    var includesTag = activeTags().indexOf(tag) >= 0;

    if (includesTag) {
        url = `/tags/${tag.replace(' ', '-')}/`;
    } else {
        url = defaultUrl;
    }

    if (text.length > 14) {
        classes.push('double-line');
    }
    classes.push(getRotation());
    classes.push(getColor());
    classes.push(shape);

    switch (shape) {
    case 'square':
        if (randomElement([true, false])) {
            classes.push('rounded');
        }
        output = `<a class='${classes.join(' ')}' href='${url}'>
                    <span class='text'>${text}</span>
                    <span class='year'>${year}</span>
                </a>`;
        break;
    case 'rectangle':
        if (randomElement([true, false])) {
            classes.push('rounded');
        }
        output = `<a class='${classes.join(' ')}' href='${url}'>
                    <span class='text'>${text}</span>
                    <span class='year'>${subYear}</span>
                </a>`;
        break;
    case 'circle':
        output = `<a class='${classes.join(' ')}' href-'${url}'>
                    <svg width='150px' height='150px' preserveAspectRatio='xMinYMin'>
                        <defs>
                            <path id='textPath' stroke='1px solid #ddd' d='M25,75a50,50 0 0,1 100,0a50,50 0 0,1 -100,0' />
                        </defs>
                        <text x='0' y='0' text-anchor='start'>
                            <textPath xlink:href='#textPath' startOffset='0'>${text}</textPath>                           
                        </text>
                    </svg>
                    <span class='year'>${year}</span>
                </a>`;
        break;
    default:
        
    }

    return output;
});
