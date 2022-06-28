# Hackathon owl-editor
This is a hackathon project from 2016 that tries to address problems with content editable on HTML elements which result in different HTML structures for the same formatting in different browser or in the same browser when applied in a different order.

The goal was to have an efficient data structure while working with content editable, for which we use one array for the content and another bit array for the formatting which reflects 8 formatting options per character. This is then used to generate a unified HTML structure in the one direction, and for storing it serverside it gets transformed into a human readable JSON structure that aggregates formattings on character ranges.
