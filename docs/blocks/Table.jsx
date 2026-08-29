import { styled } from 'storybook/theming';

export const TableWrapper = styled.table(({ theme }) => ({
  '&&': {
    // Resets for cascading/system styles
    borderSpacing: 0,
    color: theme.color.defaultText,

    'td, th': {
      padding: 0,
      border: 'none',
      verticalAlign: 'top',
      textOverflow: 'ellipsis',
    },
    // End Resets

    fontSize: theme.typography.size.s2 - 1,
    lineHeight: '19px',
    textAlign: 'left',
    width: '100%',

    // Margin collapse
    marginTop: 25,
    marginBottom: 40,

    'thead th:first-of-type, td:first-of-type': {
      // intentionally specify thead here
      width: '25%',
    },

    'th:first-of-type, td:first-of-type': {
      paddingLeft: 20,
    },

    'th:nth-of-type(2), td:nth-of-type(2)': {
      // Description column
      width: '35%',
    },

    'td:nth-of-type(3)': {
      // Defaults column
      width: '15%',
    },

    'th:last-of-type, td:last-of-type': {
      paddingRight: 20,
      // Controls column
      width: '25%',
    },

    th: {
      color: theme.textMutedColor,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
    },

    td: {
      paddingTop: '10px',
      paddingBottom: '10px',

      '&:not(:first-of-type)': {
        paddingLeft: 15,
        paddingRight: 15,
      },

      '&:last-of-type': {
        paddingRight: 20,
      },
    },

    tr: {
      borderTop: 0,
    },

    // Makes border alignment consistent w/other DocBlocks
    marginInline: 1,
    paddingInline: 0,

    tbody: {
      // Safari doesn't love shadows on tbody so we need to use a shadow filter. In order to do this,
      // the table cells all need to be solid so they have a background color applied.
      // I wasn't sure what kinds of content go in these tables so I was extra specific with selectors
      // to avoid unexpected surprises.
      filter:
        theme.base === 'light'
          ? `drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.10))`
          : `drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.20))`,

      '> tr > *': {
        // For filter to work properly, the table cells all need to be opaque.
        background: theme.background.content,
        borderTop: `1px solid ${theme.appBorderColor}`,
      },

      // This works and I don't know why. :)
      '> tr:first-of-type > *': {
        borderBlockStart: `1px solid ${theme.appBorderColor}`,
      },
      '> tr:last-of-type > *': {
        borderBlockEnd: `1px solid ${theme.appBorderColor}`,
      },
      '> tr > *:first-of-type': {
        borderInlineStart: `1px solid ${theme.appBorderColor}`,
      },
      '> tr > *:last-of-type': {
        borderInlineEnd: `1px solid ${theme.appBorderColor}`,
      },

      // Thank you, Safari, for making me write code like this.
      '> tr:first-of-type > td:first-of-type': {
        borderTopLeftRadius: theme.appBorderRadius,
      },
      '> tr:first-of-type > td:last-of-type': {
        borderTopRightRadius: theme.appBorderRadius,
      },
      '> tr:last-of-type > td:first-of-type': {
        borderBottomLeftRadius: theme.appBorderRadius,
      },
      '> tr:last-of-type > td:last-of-type': {
        borderBottomRightRadius: theme.appBorderRadius,
      },
    },

    // High contrast mode: ensure borders are visible with system colors
    '@media (forced-colors: active)': {
      tbody: {
        filter: 'none',

        '> tr > *': {
          borderColor: 'CanvasText',
        },
      },
    },

    // End awesome table styling
  },
}));

const TablePositionWrapper = styled.div({
  position: 'relative',
});

export const Table = ({ headers, rows }) => (
  <TablePositionWrapper>
    <TableWrapper
      className="sb-unstyled"
      lang="en"
    >
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  </TablePositionWrapper>
);

export default Table;
