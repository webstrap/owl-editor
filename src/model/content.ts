'use strict';

import { Paragraph } from './paragraph';
import { Map } from '../utils';

export type ParagraphId = Number;

export class Content 
{
	list: Array<Paragraph>;
	map: Map<Paragraph>;
}
