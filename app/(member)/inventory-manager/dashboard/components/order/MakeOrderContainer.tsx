import React, {useState} from 'react';
import {Button} from "@/components/ui";
import MakeOrder from "@/app/(member)/inventory-manager/dashboard/components/order/MakeOrder";

const MakeOrderContainer = () => {
  const [showMakeOrderForm, setShowMakeOrderForm] = useState(true);
  return (
    <div className={'grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'}>
      {showMakeOrderForm
        ? <MakeOrder onClose={() => setShowMakeOrderForm(false)}/>
        : <Button
            className={'w-fit'}
            onClick={() => setShowMakeOrderForm(true)}
          >
            Make order
          </Button>
      }
    </div>
  );
};

export default MakeOrderContainer;