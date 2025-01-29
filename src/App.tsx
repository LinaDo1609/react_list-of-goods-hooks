import React, {useState} from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortField {
  length = 'lenght',
  alphabet = 'alphabet'
}

type ReorderOption = {
  sortField: string;
  reverseFields: boolean | string;
}

function getPreparedGoods(goods: string[],{ sortField, reverseFields }:ReorderOption) {
  const prepGoods = [...goods];

  if (sortField) {
    prepGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.alphabet:
          return good1.localeCompare(good2);
        case SortField.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseFields) {
    return prepGoods.reverse();
  }

  return prepGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reverseFields, setReverse] = useState(false);
  const [reset, setReset] = useState(false);
  const goods = getPreparedGoods(
    goodsFromServer,
    {
      sortField,
      reverseFields
    },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortField.alphabet
              ? 'button'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SortField.alphabet);
            setReset(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortField.length
              ? 'button'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SortField.length);
            setReset(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseFields ? 'button' : 'button is-info is-light'}
          onClick={() => {
            setReverse((prevreverseFields) => !prevreverseFields);
            setReset(prevReset => (sortField ? true : !prevReset));
          }}
        >
          Reverse
        </button>

        {reset && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => {
              setSortField('');
              setReverse(false);
              setReset(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
