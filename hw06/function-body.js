function morph(commands, unicode, defaultUPM) {
    // console.log('Before', commands)

    var new_commands = [];
    var last_pt = null;
    for (var i = 0; i < commands.length; i++) {
        var command = commands[i];
        var cur_pt = null;

        switch (command['command']) {
            case 'moveto':
                cur_pt = {
                    'x': command['x'],
                    'y': command['y'],
                }
                new_commands.push(command);
                break
            case 'lineto':
                cur_pt = {
                    'x': command['x'],
                    'y': command['y'],
                }
                break
            case 'vertical lineto':
                cur_pt = {
                    'x': last_pt['x'],
                    'y': command['y'],
                }
                break
            case 'horizontal lineto':
                cur_pt = {
                    'x': command['x'],
                    'y': last_pt['y'],
                }
                break
            case 'closepath':
                new_commands.push(command);
                break
        }

        if (cur_pt != null && last_pt != null) {
            var vector = { 'x': cur_pt['x'] - last_pt['x'], 'y': cur_pt['y'] - last_pt['y'] };
            var magnitude = Math.sqrt(vector['x'] ** 2 + vector['y'] ** 2);
            var slope = vector['y'] / vector['x'];
            var adj_x = vector['x'] * 1.2;
            var adj_y = vector['y'] * 1.2;

            new_commands.push({
                'code': 'L',
                'command': 'lineto',
                'x': Math.round((last_pt['x'] + adj_x) * 100) / 100,
                'y': Math.round((last_pt['y'] + adj_y) * 100) / 100,
            });
        }

        last_pt = cur_pt
    }
    // console.log('After', new_commands)

    //You Must return an array, first element is path commands, second element is upm(optimal)
    return [new_commands];
};