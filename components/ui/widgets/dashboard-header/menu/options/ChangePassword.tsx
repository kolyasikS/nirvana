import React, {useState} from 'react';
import {Button, DropdownMenuItem, FormInputBox, Loader} from "@/components/ui";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useMutation} from "@tanstack/react-query";
import {AuthController} from "@/controllers/auth/Auth.controller";
import {toast} from "@/hooks/use-toast";
import {userStore} from "@lib/stores";

type Props = {
  changePasswordModalVisible: boolean;
  setChangePasswordModalVisible: (b: boolean) => void;
}
const ChangePassword = ({
  changePasswordModalVisible,
  setChangePasswordModalVisible
}: Props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const changePassword = useMutation({
    mutationFn: (AuthController.changePassword),
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
      setIsLoading(false);
    },
    onSuccess: ({ data, message}) => {
      userStore.clearUser();
      toast({
        title: message
      });
      setChangePasswordModalVisible(false);
    },
  });

  const handleUpdateButtonClick = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    changePassword.mutate({
      oldPassword,
      newPassword,
    });
  }

  return (
    <>
      <Dialog open={changePasswordModalVisible} onOpenChange={(isOpen) => !isOpen && setChangePasswordModalVisible(isOpen)}>
        <DialogContent className="sm:max-w-[425px] gap-6">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <FormInputBox value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} label={'Current Password'}/>
          <FormInputBox value={newPassword} onChange={(e) => setNewPassword(e.target.value)} label={'New Password'} type="password"/>
          <DialogFooter className={'flex w-full justify-between'}>
            <Button type="button" variant="outline" onClick={() => setChangePasswordModalVisible(false)}>Close</Button>
            <Button
              type="submit"
              onClick={handleUpdateButtonClick}
              className={'w-24'}
            >
              {isLoading ? <Loader /> : 'Update'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangePassword;