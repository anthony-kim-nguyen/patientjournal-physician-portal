import { Box } from "@mui/material";

import { type Router } from '@toolpad/core/AppProvider';


type PageContentControllerProps = {
  router: Router;
};


export default function PageContentController({ router }: PageContentControllerProps){
  const { pathname } = router;

  // if (pathname.startsWith('/group/')) {
  //   return (
  //     <Box>
  //       <IndividualGroupPage />
  //     </Box>
  //   );
  // }
    switch(pathname){
      case '/':
        return (
          <Box
          sx={{
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          
        </Box>
          
        
        );
    }

  }