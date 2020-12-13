// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: React gets flagged with TS6133, temporary hack
import { default as React, Component } from 'react';

export class License extends Component {
    private static text = `Copyright (C) 2020 by Hansruedi Patzen <hp@revy.ch>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`;

    render(): JSX.Element {
        return (
            <div className="container">
                <h3>License</h3>
                <pre>{License.text}</pre>
            </div>
        );
    }
}
