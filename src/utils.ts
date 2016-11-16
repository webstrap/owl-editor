'use strict';

export interface Map<T>
{
    [ K: string ]: T;
}

export function defer( func: Function, timeout: number = 300 ): Function
{
	let timer: Number | void;

	return function()
	{
		if ( timer != null )
		{
			return;
		}

		setTimeout( () =>
		{
			timer = null;
			func();
		}, timeout );
	}
}